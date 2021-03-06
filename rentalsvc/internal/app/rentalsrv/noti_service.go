package rentalsrv

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"

	book "github.com/Buzzvil/stella/rentalsvc/pkg/ext/book"
	user "github.com/Buzzvil/stella/rentalsvc/pkg/ext/user"
	"google.golang.org/grpc"
)

type notifier struct {
	enabled    bool
	slackToken string
	userClient user.UserServiceClient
	bookClient book.BookServiceClient
}

func (n *notifier) sendNotification(userID int64, entityID int64) error {
	ctx := context.Background()
	u, err := n.userClient.GetUser(ctx, &user.GetUserRequest{
		Identifier: &user.GetUserRequest_Id{
			Id: userID,
		},
	})
	if err != nil {
		return err
	}
	b, err := n.bookClient.GetBook(ctx, &book.GetBookRequest{
		Id: entityID,
	})
	if err != nil {
		return err
	}
	params := url.Values{
		"token":   {n.slackToken},
		"channel": {u.GetSlackUserId()},
		"text":    {fmt.Sprintf("%s is available.", b.GetName())},
	}
	resp, err := http.PostForm("https://slack.com/api/chat.postMessage", params)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Response 체크.
	respBody, err := ioutil.ReadAll(resp.Body)
	if err == nil {
		str := string(respBody)
		println(str)
	}
	return err
}

func newNotifier() notifier {
	n := notifier{}
	n.slackToken = os.Getenv("SLACK_TOKEN")
	if n.slackToken == "" {
		n.enabled = false
		return n
	}

	uConn, err := grpc.Dial(os.Getenv("USERSVC_URL"), grpc.WithInsecure())
	if err != nil {
		log.Printf("did not connect: %v", err)
		n.enabled = false
		return n
	}
	n.userClient = user.NewUserServiceClient(uConn)

	bConn, err := grpc.Dial(os.Getenv("BOOKSVC_URL"), grpc.WithInsecure())
	if err != nil {
		log.Printf("did not connect: %v", err)
		n.enabled = false
		return n
	}
	n.enabled = true
	n.bookClient = book.NewBookServiceClient(bConn)
	return n
}

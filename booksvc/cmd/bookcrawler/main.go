package main

import (
	"fmt"
	"os"
	"strings"

	"github.com/Buzzvil/stella/booksvc/internal/app/crawlersrv"
)

func main() {
	r := crawlersrv.NewRunner(os.Getenv("KAKAO_API_KEY"))
	title := ""
	author := ""
	publisher := ""
	query := strings.Join([]string{title, author, publisher}, " ")
	err := r.Start(query)
	if err != nil {
		fmt.Println(err)
	}
}

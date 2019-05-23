package main

import (
	"fmt"
	"os"

	"github.com/Buzzvil/stella/booksvc/internal/app/crawlersrv"
)

func main() {
	r := crawlersrv.NewRunner(os.Getenv("KAKAO_API_KEY"))
	query := "떡볶이 백세희"
	err := r.Start(query)
	if err != nil {
		fmt.Println(err)
	}
}

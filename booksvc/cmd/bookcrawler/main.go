package main

import (
	"bufio"
	"encoding/csv"
	"fmt"
	"os"
	"strings"

	"github.com/Buzzvil/stella/booksvc/internal/app/crawlersrv"
)

func main() {
	file, _ := os.Open("./book.csv")
	rdr := csv.NewReader(bufio.NewReader(file))
	rows, _ := rdr.ReadAll()
	r := crawlersrv.NewRunner(os.Getenv("KAKAO_API_KEY"))
	for _, row := range rows {
		pubs := strings.Fields(row[1])
		query := strings.Join([]string{row[0], pubs[0], row[2]}, " ")
		err := r.Start(query)
		if err != nil {
			fmt.Printf("%s: %s \n", err, query)
		}
	}
}

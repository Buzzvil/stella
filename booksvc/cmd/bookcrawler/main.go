package main

import (
	"bufio"
	"database/sql"
	"encoding/csv"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/Buzzvil/stella/booksvc/internal/app/crawlersrv"
	_ "github.com/lib/pq"
)

func main() {
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Failed to open database: %v", err)
	}

	file, _ := os.Open(os.Getenv("BOOK_CSV_PATH"))
	rdr := csv.NewReader(bufio.NewReader(file))
	rows, _ := rdr.ReadAll()
	r := crawlersrv.NewRunner(os.Getenv("KAKAO_API_KEY"), db)
	for _, row := range rows {
		pubs := strings.Fields(row[1])
		p := ""
		if len(pubs) > 0 {
			p = pubs[0]
		}
		query := strings.Join([]string{row[0], p, row[2]}, " ")
		err := r.Start(query)
		if err != nil {
			fmt.Printf("%s: %s \n", err, query)
		}
	}
}

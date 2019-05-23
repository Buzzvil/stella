package crawlerrepo

import (
	"encoding/json"
	"net/http"
	"net/url"

	"github.com/Buzzvil/stella/booksvc/internal/pkg/crawler"
)

type repo struct {
	Key string
}

type kakaoResp struct {
	Documents []kakaoBook
}

type kakaoBook struct {
	Contents  string
	Isbn      string
	Publisher string
	Thumbnail string
	Title     string
	Authors   []string
}

// New creates repository.
func New(key string) crawler.Repo {
	return &repo{Key: key}
}

func (r *repo) Search(query string) (*crawler.Book, error) {
	client := &http.Client{}
	api := "https://dapi.kakao.com/v3/search/book"
	req, err := http.NewRequest("GET", api+"?query="+url.QueryEscape(query), nil)
	req.Header.Add("Authorization", "KakaoAK "+r.Key)
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	target := &kakaoResp{}
	e := json.NewDecoder(resp.Body).Decode(target)
	if len(target.Documents) > 0 {
		r := target.Documents[0]
		return &crawler.Book{
			Authors:   r.Authors,
			Content:   r.Contents,
			Isbn:      r.Isbn,
			Publisher: r.Publisher,
			Name:      r.Title,
		}, e
	}
	return nil, e
}

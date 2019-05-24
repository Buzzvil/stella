package jwt

import (
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
	jwtlib "github.com/dgrijalva/jwt-go"
)

// TokenLifetime is duration a token is valid.
const TokenLifetime = time.Hour * 24 * 2
const issuer = "authsvc"

// AuthClaims consists of standard jwt claims and UserID.
type AuthClaims struct {
	UserID int `json:"user_id"`
	jwtlib.StandardClaims
}

// SignedUserToken creates signed JWT token.
func SignedUserToken(signingKey []byte, userID int) (string, error) {
	claims := AuthClaims{
		userID,
		jwtlib.StandardClaims{
			ExpiresAt: time.Now().Add(TokenLifetime).Unix(),
			Issuer:    issuer,
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(signingKey)
}

// ParseUserToken parses JWT string and returns AuthClaims when valid token is given
func ParseUserToken(signingKey []byte, ts string) (*AuthClaims, error) {
	token, err := jwtlib.ParseWithClaims(ts, &AuthClaims{}, func(token *jwtlib.Token) (interface{}, error) {
		return signingKey, nil
	})
	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(*AuthClaims); ok && token.Valid {
		return claims, nil
	} else {
		return nil, fmt.Errorf("invalid token")
	}
}

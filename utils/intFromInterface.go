package utils

import (
	"strconv"
)

func IntFromInterface(value interface{}) (int, bool) {
	switch v := value.(type) {
	case int:
		return v, true
	case float64:
		return int(v), true
	case string:
		parsedValue, err := strconv.Atoi(v)
		if err == nil {
			return parsedValue, true
		}
		return 0, false
	default:
		return 0, false
	}
}

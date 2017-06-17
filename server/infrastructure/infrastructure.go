package infrastructure

import "os"

// Environment - get env vars with fallback
func Environment(key string, fallback string) string {
	aEnvVar := os.Getenv(key)

	if aEnvVar == "" {
		return fallback
	}

	return aEnvVar
}

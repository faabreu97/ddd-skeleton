SHELL := /bin/sh

.PHONY = clean
clean:
	docker compose down --rmi local --volumes --remove-orphans

.PHONY = start-database
start_database:
	docker compose up -d backoffice-db marketplace-db rabbitmq
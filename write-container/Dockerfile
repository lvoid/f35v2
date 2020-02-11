FROM alpine:edge as BUILD

RUN apk add --no-cache netcat-openbsd

CMD echo "32 32 32" | nc localhost 9991 && tail -f /dev/null

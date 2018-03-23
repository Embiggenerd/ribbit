function localtunnel {
  lt -s horsesaref0nny --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done

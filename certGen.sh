#!/bin/bash

# -----------------------------
# Configuration
# -----------------------------
CERT_DIR="./certs"

# -----------------------------
# Detect LAN IP
# -----------------------------
LAN_IP=""
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  LAN_IP=$(ipconfig getifaddr en1)
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  # Linux
  LAN_IP=$(hostname -I | awk '{print $1}')
else
  echo "Unsupported OS: $OSTYPE"
  exit 1
fi

if [ -z "$LAN_IP" ]; then
  echo "Could not detect LAN IP. Please set LAN_IP manually."
  exit 1
fi

echo "Detected LAN IP: $LAN_IP"

HOSTS="localhost 127.0.0.1 ::1 $LAN_IP"

# -----------------------------
# Create cert directory if missing
# -----------------------------
mkdir -p "$CERT_DIR"

# -----------------------------
# Install mkcert root CA if needed
# -----------------------------
MKCERT_CAROOT=$(mkcert -CAROOT 2>/dev/null)
if [ ! -d "$MKCERT_CAROOT" ]; then
  echo "Installing mkcert root CA..."
  mkcert -install
fi

# -----------------------------
# Generate certificates
# -----------------------------
CERT_FILE="$CERT_DIR/cert.pem"
KEY_FILE="$CERT_DIR/key.pem"

echo "Generating mkcert certificate for: $HOSTS"
mkcert -cert-file "$CERT_FILE" -key-file "$KEY_FILE" $HOSTS

echo "Certificates generated:"
echo " - $CERT_FILE"
echo " - $KEY_FILE"


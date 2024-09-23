import os
import binascii

# Generate a secure random key
secret_key = binascii.hexlify(os.urandom(24)).decode()

print(secret_key)

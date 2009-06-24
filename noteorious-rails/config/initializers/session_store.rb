# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_noteorious-rails_session',
  :secret      => '7e32172d69d7c46338428a4c28c33c4a3bfa1450081ba6f151d217c6d7ad8bd937531a3d42f1bc4235f9ecbb56b569292971c31c288939253f23297180cfe87f'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store

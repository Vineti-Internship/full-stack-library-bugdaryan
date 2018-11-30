class Author < ApplicationRecord
    validates_uniqueness_of :username, :email
    has_secure_password
    has_secure_token :auth_token
    has_many :books, dependent: :destroy
    validates :username, length: {minimum:4, maximum:20}
    validates :name, presence: true
    validates :email, presence: true
    # validates :password, length: {minimum:5, maximum:20}
    # validates :password, length: { minimum: 5, maximum: 20 }
    validates :password_digest, presence: true
    validates_presence_of :password_confirmation, :if => :password_digest_changed?

    def invalidate_token
        self.update_columns(auth_token: nil)
    end

    def self.validate_login(username, password)
        author=find_by(username: username)
        if author&.authenticate(password)
            author
        end
    end
end

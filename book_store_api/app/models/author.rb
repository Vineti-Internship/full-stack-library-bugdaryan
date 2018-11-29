class Author < ApplicationRecord
    validates_uniqueness_of :username
    has_secure_password
    has_secure_token :auth_token
    has_many :books, dependent: :destroy

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

class AuthorsController < ApiController
    before_action :require_login, except: [:create]

    def create
        author = Author.create!(author_params)

        render json: {token: author.auth_token}
    end

    def profile
        author = Author.find_by_auth_token!(request.headers[:token])
        author_books = author.books

        render json:{author:{username: author.username, email:author.email, name:author.name, id: author.id}, books:author_books}
    end

    private

    def author_params
        params.require(:author).permit(:username, :password, :name, :email)
    end
end

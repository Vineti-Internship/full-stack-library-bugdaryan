class CreateAuthors < ActiveRecord::Migration[5.2]
  def change
    create_table :authors do |t|
      t.string :username
      t.string :password_digest
      t.string :email
      t.string :name
      t.string :auth_token

      t.timestamps
    end
  end
end

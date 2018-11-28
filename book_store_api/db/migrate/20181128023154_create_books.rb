class CreateBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :books do |t|
      t.string :title
      t.string :genre
      t.text :description
      t.float :rating
      t.belongs_to :author

      t.timestamps
    end
  end
end

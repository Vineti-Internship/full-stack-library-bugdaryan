# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Author.destroy_all
Book.destroy_all

leila = Author.create(username:'leila', email:'leila@mail.com', password:'test')
peter = Author.create(username:'peter', email:'peter@mail.com', password:'test')
fleur = Author.create(username:'fleur', email:'fleur@mail.com', password:'test')
john = Author.create(username:'john', email:'john@mail.com', password:'test')

puts "#{Author.count} authors created!"

Book.create!(author:leila, title:'leilas book 1', genre:'genre')
Book.create!(author:leila, title:'leilas book 2', genre:'genre')
Book.create!(author:leila, title:'leilas book 3', genre:'genre')
Book.create!(author:peter, title:'peters book 1', genre:'genre')
Book.create!(author:peter, title:'peters book 2', genre:'genre')
Book.create!(author:peter, title:'peters book 3', genre:'genre')
Book.create!(author:peter, title:'peters book 4', genre:'genre')
Book.create!(author:peter, title:'peters book 5', genre:'genre')
Book.create!(author:fleur, title:'fleurs book 1', genre:'genre')
Book.create!(author:fleur, title:'fleurs book 2', genre:'genre')
Book.create!(author:john, title:'johns book 1', genre:'genre')
Book.create!(author:john, title:'johns book 2', genre:'genre')
Book.create!(author:john, title:'johns book 3', genre:'genre')
Book.create!(author:john, title:'johns book 4', genre:'genre')
Book.create!(author:john, title:'johns book 5', genre:'genre')
Book.create!(author:john, title:'johns book 6', genre:'genre')

puts "#{Book.count} books created!"

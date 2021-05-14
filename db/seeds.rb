# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# user = User.create(username: "yehia", password_digest: "123456", email: "yehia@yehia.com")
Category.destroy_all

category1 = Category.new({ name: "Electronics" })
category2 = Category.new({ name: "Beauty & Makeup" })
category3 = Category.new({ name: "Fashion & Clothing" })
category4 = Category.new({ name: "Mobiles" })
category5 = Category.new({ name: "Televisions" })
category6 = Category.new({ name: "Children & Toys" })

category1.image.attach(io: File.open('app/assets/images/electronics.jpg'), filename: 'electronics.jpg')
category2.image.attach(io: File.open('app/assets/images/beauty_and_makeup.jpg'), filename: 'beauty_and_makeup.jpg')
category3.image.attach(io: File.open('app/assets/images/cloths.jpg'), filename: 'cloths.jpg')
category4.image.attach(io: File.open('app/assets/images/mobiles.jpg'), filename: 'mobiles.jpg')
category5.image.attach(io: File.open('app/assets/images/tv.jpg'), filename: 'tv.jpg')
category6.image.attach(io: File.open('app/assets/images/toys.jpg'), filename: 'toys.jpg')



category1.save()
category2.save()
category3.save()
category4.save()
category5.save()
category6.save()




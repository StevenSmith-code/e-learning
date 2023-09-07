

# seeds.rb

require 'faker'

# Clear old data
CourseTag.destroy_all
Enrollment.destroy_all
Course.destroy_all
User.destroy_all
Tag.destroy_all

puts "Creating Users..."
10.times do
  User.create!(
    username: Faker::Internet.unique.username,
    email: Faker::Internet.unique.email,
    password: Faker::Internet.password(min_length: 6, max_length: 20),
    avatar: Faker::Avatar.image,
    bio: Faker::Lorem.sentence(word_count: 5),
    role: rand(0..1) # assuming 0 and 1 are valid roles
  )
end



# Create Courses
puts "Creating Courses..."
courses = []

10.times do |n|
  courses << Course.create!(
    title: Faker::Educator.course_name,
    content_link: Faker::Internet.url,
    price: Faker::Commerce.price(range: 50.0..500.0, as_string: true),
    instructor: User.where(role: 1).sample,
    description: Faker::Lorem.paragraph,
    image_url: Faker::Avatar.image,
    duration: rand(30..240),
    average_rating: rand(1.0..5.0).round(2),
    total_reviews: rand(10..100),
    provides_certificate: [true, false].sample,
    status: rand(0..3)  # Assuming 4 statuses, 0 to 3
  )
end

# Create Enrollments
puts "Creating Enrollments..."
enrollments = []
students = User.where(role: :student)
10.times do
    Enrollment.create!(
      student: students.sample,
      course: courses.sample,
      is_active: [true, false].sample,
      is_completed: [true, false].sample
    )
  end

# Create Tags and CourseTags
puts "Creating Tags..."
tags = ['Web Development', 'Data Science', 'Graphic Design', 'Business', 'Photography']

tags.each do |tag_name|
  tag = Tag.create!(name: tag_name)
  courses.sample(5).each do |course|
    CourseTag.create!(course: course, tag: tag)
  end
end

puts "Seeding completed!"

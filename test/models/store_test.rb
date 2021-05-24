require 'test_helper'

class StoreTest < ActiveSupport::TestCase
  @test_user = :generate_user

  test "should not save the store without a name" do
    store = Store.new
    store.user = @test_user
    store.summary = "Some store description"
    assert_not store.save
  end

  test "should not save the store without summary" do
    store = Store.new
    store.user = @test_user
    store.name = Faker::Company.unique.name
    assert_not store.save
  end

  test "should not save the store with a name already has been taken" do
    original_store = Store.new
    original_store.user = @test_user
    original_store.name = Faker::Company.unique.name
    original_store.summary = "Interesting original_store summary"
    original_store.save

    store = Store.new
    store.user = @test_user
    store.name = original_store.name
    store.summary = "Summary"
    assert_not store.save
  end

  test "should not save the store without a user" do
    store = Store.new
    store.name = Faker::Company.unique.name
    store.summary = "Summary"
    assert_not store.save
  end

  test "should not save the user with a user that not in the system" do
    store = Store.new
    store.user = User.find_by(id: nil)
    store.name = Faker::Company.unique.name
    store.summary = "Summary"
    assert_not store.save
  end

  private
  def generate_user
    user = User.new
    user.email = Faker::Internet.email
    user.username = Faker::Name.first_name
    user.password = Faker::Internet.password
    user.password_confirmation = user.password
    user.save
    return user
  end
end

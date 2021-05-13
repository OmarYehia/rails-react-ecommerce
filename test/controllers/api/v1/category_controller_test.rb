require 'test_helper'

class Api::V1::CategoryControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_category_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_category_create_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_category_show_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_category_destroy_url
    assert_response :success
  end

end

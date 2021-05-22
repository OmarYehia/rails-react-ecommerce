require 'test_helper'

class Api::V1::StoreControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_store_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_store_create_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_store_show_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_store_destroy_url
    assert_response :success
  end

end

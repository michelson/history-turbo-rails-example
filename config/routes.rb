Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: "home#index"

  match '/home/a' => 'home#a', via: :get
  match '/home/b' => 'home#b', via: :get
  match '/home/c'  => 'home/c', via: :get
  match '/home/no_frame'  => 'home/no_frame', via: :get
  match '/home/other_frame'  => 'home/other_frame', via: :get

end

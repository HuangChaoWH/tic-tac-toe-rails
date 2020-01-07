Rails.application.routes.draw do
  get 'game/new'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'game#new'
end

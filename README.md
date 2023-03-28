No projeto, foi desenvolvido uma API e um banco de dados para produção de conteúdo de um blog. É utilizado o Node.js, usando o pacote sequelize para realizar o CRUD dos posts. 

Foram desenvolvidos endpoints que estão conectados ao banco de dados seguindo os princípios do REST. 

Para rodar o projeto em sua máquina com docker, digite o comando docker-compose up -d --build no terminal do diretório. Em seguida, digite o comando docker exec -it blogs_api bash e instale as dependências com npm install.

Para rodar o projeto sem docker, basta digitar o comando npm install no terminal do diretório.

Estou aberto à quaisquer dicas e feedbacks!

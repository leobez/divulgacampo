import React from 'react'
import styles from './About.module.css'


const About = () => {
	return (
		<div className={styles.about}>
			<div className= {styles.card_about}>
			<h1>Sobre o Divulga Campo</h1>
			<p>DivulgaCampo se trata de um website de compartilhamento de pesquisas de campo, onde as pessoas podem divulgar e responder tais pesquisas a fim de contribuir para o desenvolvimento de trabalhos pessoais, escolares e acadêmicos umas das outras. </p>
			</div>

			<div className= {styles.cardcontainer}>
			<h1>Como Utilizar:</h1>
				 {/* Realizar Cadastro */}
				<div className={styles.card}>
					<h3>Realizando Cadastro:</h3>
					<p>Para realizar seu cadastro é necessario informar um e-mail válido e uma definir uma senha forte. Após isso você já poderá utilizar todas as ferramentas que o DivulgaCampo oferece. Se houver algum problema com e-mail ou senha poderá ser realizada a troca de ambos.</p>	
				</div>	
				{/* Como fazer Post */}
				<div className={styles.card}>
				<h3>Criando seu primeiro post:</h3>
					<p>Na aba home existe o botão 'Divulgue sua pesquisa de campo' e na Barra de Navegação tem o botão 'Criar Postagem', ao clicar em um deles você poderá informar os seguintes componentes: Titulo, Descrição, Palavras Chaves e Tempo de Atividade da Postagem. Após isso podera criar seu formulário pela próprio post, ou anexar um formulário já pronto.</p>
				</div>	
				{/* Como responder as pesquisa */}
				<div className={styles.card}>
				<h3>Respondendo Questionarios: </h3>
					<p>Ao clicar em um post você poderá ler as informações fornecidas pelo usuário em relação a pesquisa dele, e logo abaixo estará o Questionario disponivel para respostas. </p>
				</div>	
				{/* Como fazer pesquisas */}
				<div className={styles.card}>
				<h3>Buscandos por Temas:</h3>
					<p>Na criação de postagens é possivel colocar palavras chaves relacionadas ao estudo do usuário, palavras essas que servirão de tag para pesquisas por tema. Então na aba home terá uma barra de pesquisa onde você pode procurar por temas que te interessam. </p>
				</div>	
			</div>	

			<div className= {styles.card_redes}>
				<h1>Nossas Redes: Github</h1>
				
					<div>
						<a href="https://github.com/leobez" target='_blank'>Leonardo Bezerra
					</a>
					</div>
					
					<div >
						<a href="https://github.com/narcosmeves" target='_blank'>Marcos Neves
					</a>
					</div>

			</div>
		</div>

	)
}

export default About
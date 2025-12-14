# Product design

<span style="color:red">Pré-requisitos: <a href="02-Product-discovery.md"> Product discovery</a></span>

Neste momento, transformam-se os insights e validações obtidos em soluções tangíveis e utilizáveis. Esta fase envolve a definição de uma proposta de valor, detalhando a prioridade de cada ideia, e a consequente criação de wireframes, mockups e protótipos de alta fidelidade, que especificam a interface e a experiência do usuário.


## Histórias de usuários


| PERSONA |  | EU COMO...  |	QUERO/PRECISO...  |	PARA...   |
| ------ | ---------------------------------------------------------- | ---------- |
| Ana Clara |	Identificar e bloquear anúncios de produtos e promoções falsas	Fazer compras com segurança e não ser enganada por ofertas falsas.  |
| Poliana |	Construir transparência e credibilidade com meus seguidores	Recomendar sites e links confiáveis para manter a confiança do público. |
| Maria Aparecida |	Restringir acesso de menores a sites inadequados	Proteger meus filhos de conteúdos impróprios e influências negativas. |
| Roberto |	Identificar e verificar sites fraudulentos	Fazer pagamentos e compras online com segurança para minha família. |
| Dona Lúcia |	Verificar notificações e proteger meus dados	Manter meu dinheiro seguro e poder ajudar minha neta com a faculdade. |
| Ana Clara |	Monitorar transações bancárias em tempo real	Ter certeza que minhas transações e PIX estão protegidas contra golpes. |
| Poliana |	Detectar links e perfis suspeitos	Manter meus dados pessoais seguros e gerar tranquilidade para meus seguidores.  |
| Maria Aparecida |	Receber alertas visuais de fácil entendimento	Economizar tempo com verificações automáticas e ter suporte disponível. |
| Roberto |	Receber alertas preventivos sobre possíveis riscos	Evitar cair em golpes financeiros e proteger meus dados pessoais. |
| Dona Lúcia |	Usar um sistema simples com letras legíveis	Poder navegar sem medo de cair em golpes e me sentir respeitada. |





Apresente aqui as histórias de usuários que são relevantes para o projeto da sua solução. As histórias de usuários consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuários por contexto, para facilitar consultas recorrentes a esta parte do documento.


## Proposta de valor

<img width="860" height="496" alt="image" src="https://github.com/user-attachments/assets/0c3e2a39-7850-45a1-a432-4b2e10719753" />
<img width="869" height="511" alt="image" src="https://github.com/user-attachments/assets/2ceba76e-772e-4a71-9874-8611a57c544e" />
<img width="865" height="521" alt="image" src="https://github.com/user-attachments/assets/28187b10-8572-4704-aaac-fb452505311c" />
<img width="876" height="504" alt="image" src="https://github.com/user-attachments/assets/f7fc2dda-f4e3-4b64-a683-65089120bc52" />
<img width="863" height="509" alt="image" src="https://github.com/user-attachments/assets/3b66f39b-0767-4fb4-b293-80efd6cb40bd" />













## Requisitos

As tabelas a seguir apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade dos requisitos, aplique uma técnica de priorização e detalhe como essa técnica foi aplicada.

### Requisitos funcionais

| ID     | Descrição do Requisito                                   | Prioridade |
| ------ | ---------------------------------------------------------- | ---------- |
| RF-001 | O sistema deve permitir acesso rápido a um guia de emergências com instruções passo a passo.| ALTA       |
| RF-002 | O sistema deve conter uma lista de contatos urgentes (polícia, SAMU, bombeiros, delegacias especializadas).| ALTA    |
| RF-003 | O sistema deve oferecer um serviço que auxilie o usuário a localizar locais próximos, como delegacias, hospitais e outros pontos de apoio.| ALTA       |
| RF-004 | O sistema deve permitir a visualização de um mapa de risco, destacando áreas com maior índice de criminalidade.| ALTA   |
| RF-005 | O sistema deve fornecer orientações sobre como registrar um B.O. online, com link de redirecionamento para o site oficial do Estado.| ALTA     |
| RF-006 | O sistema deve organizar as informações por categorias de crime (roubo, assalto, violência doméstica, abuso sexual etc.).| ALTA      |
| RF-007 | O sistema deve permitir a visualização simplificada em dispositivos móveis, com design responsivo| ALTA      |
| RF-008 | O sistema deve solicitar que o usuário faça login para que possa acessar a comunidade e interagir com os outros usuários.| ALTA   |
| RF-009 | O sistema deve possuir filtro automático de mensagens ofensivas na área de comentários.| ALTA     |
| RF-010 | O sistema deve disponibilizar uma seção de FAQ com perguntas mais frequentes e suas respectivas respostas..| Média  | 
| RF-011 | O sistema deve disponibilizar uma seção de profissionais credenciados (psicólogos, advogados, assistentes sociais).| Média   |
| RF-012 | O sistema deve permitir que os usuários acessem uma comunidade, onde possam compartilhar relatos e experiências.| Média   |
| RF-013 | O sistema deve oferecer busca interna para facilitar a localização de orientações específicas.| Média  |      
| RF-014 | O sistema deve apresentar conteúdos em linguagem simples e acessível, evitando termos técnicos ou jurídicos complexos.| Média   | 
| RF-015 | O sistema deve ter uma seção de estatísticas básicas sobre criminalidade, de forma visual e resumida.| Média   | 
| RF-016 | O sistema deve oferecer a possibilidade de favoritar ou salvar orientações para acesso rápido posterior.| Média |                                                                                  ### Requisitos não funcionais

| ID      | Descrição do Requisito                                                              | Prioridade |
| ------- | ------------------------------------------------------------------------------------- | ---------- |
| RNF-001 | O sistema deve garantir segurança de dados e comunicações, protegendo informações do usuário.| ALTA    |
| RNF-002 | O filtro de comentários deve ser confiável, bloqueando linguagem ofensiva ou inadequada.| ALTA     |
| RNF-003 | O sistema deve deixar claro que tem caráter informativo e educativo, não substituindo o trabalho da polícia ou de órgãos oficiais.| MÉDIA  |
| RNF-004 | O sistema deve ter navegação intuitiva e simples, com menus claros e ícones fáceis de entender.|  MÉDIA  |
| RNF-005 | O sistema deve ser leve e rápido, carregando em poucos segundos, mesmo em internet móvel.        | BAIXA    |                                                                                                     > Com base nas histórias de usuários, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos não funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).

## Restrições

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

O projeto está restrito aos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001| O site não deve exigir login ou cadastro para acessar as informações principais.|
|002| O site deve usar somente fontes oficiais para links de B.O. online, estatísticas e contatos.|                                                                                                                           
|003| O site não deve ter excesso de elementos visuais ou animações pesadas que atrapalhem a usabilidade em emergências.|                                                                                                
|004| O site deve ser restrito a conteúdos informativos e educativos, sem opiniões políticas ou partidárias.|                                                                                                                 
|005| O site não deve permitir que usuários editem informações principais, apenas consumir o conteúdo.|                                                                                                                      

const keys = require('../../config/keys')

module.exports = (comment, user) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>${comment._userDisplayName} just left a comment on one of your posts.</h3>
          <p>The comment in question::</p>
          <p>${comment.text}</p>
          <div>
            <a href="${keys.redirectDomain}users/${comment._user}">${comment._userDisplayName}'s user page.</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}blogs/${comment._blog}#p${comment.id}">The comment in question.</a>
          </div>
        </div>
      </body>
    </html>
`
}

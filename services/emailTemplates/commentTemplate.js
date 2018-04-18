const keys = require('../../config/keys')

module.exports = (comment, user) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>${user.displayName} just left a comment on one of your posts.</h3>
          <p>The comment in question::</p>
          <p>${comment.text}</p>
          <div>
            <a href="${keys.redirectDomain}/api/users/${comment._user}/yes">${user.displayName}'s user page.</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/blogs/${comment._blog}#p${comment.id}">The comment in question.</a>
          </div>
        </div>
      </body>
    </html>
`
}

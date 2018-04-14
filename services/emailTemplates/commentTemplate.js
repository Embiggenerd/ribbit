const keys = require('../../config/keys')

module.exports = (comment) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>${comment._user} just left a comment on one of your posts.</h3>
          <p>Please answer the following question:</p>
          <p>${comment.text}</p>
          <div>
            <a href="${keys.redirectDomain}/api/users/${comment._user}/yes">${comment._user}'s user page.</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/comments/${comment.id}/no">The comment in question.</a>
          </div>
        </div>
      </body>
    </html>
`
}

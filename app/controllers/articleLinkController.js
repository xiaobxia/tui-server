exports.addArticleLink = async function (ctx) {
  const query = ctx.request.body
  const articleLinkService = ctx.services.articleLink
  try {
    const data = ctx.validateData({
      title: { required: true, type: 'string' },
      url: { required: true, type: 'string' }
    }, query)
    await articleLinkService.addArticleLink(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.deleteArticleLink = async function (ctx) {
  const query = ctx.query
  const articleLinkService = ctx.services.articleLink
  try {
    const data = ctx.validateData({
      id: { required: true, type: 'string' }
    }, query)
    await articleLinkService.deleteArticleLink(data.id)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getArticleLinks = async function (ctx) {
  try {
    let articleLinks = await ctx.services.articleLink.getArticleLinks()
    ctx.body = ctx.resuccess({
      list: articleLinks
    })
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

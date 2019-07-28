const Proxy = require('../proxy')

const ArticleLinkProxy = Proxy.ArticleLink

exports.addArticleLink = async function (data) {
  return ArticleLinkProxy.newAndSave({
    ...data
  })
}

exports.deleteArticleLink = async function (id) {
  const articleLink = await ArticleLinkProxy.check({ _id: id })
  if (!articleLink) {
    throw new Error('链接不存在')
  }
  return ArticleLinkProxy.delete({ _id: id })
}

exports.getArticleLinks = async function () {
  return ArticleLinkProxy.find({})
}

const express = require('express')
const Article = require('../models/arcticle')

const router = express.Router()

router.get('/new',(req,res)=>{
   res.render('new',{ article: new Article() })

})

router.get('/:id',async(req,res)=>{
    const article = await Article.findById(req.params.id)
    if (article == null) res.redirect('/')

    res.render('show',{article:article})
        
    


})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('edit', { article: article })
  })

router.post('/',async(req,res)=>{
    // res.
    let arts = new Article({
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown
    })

    try{

        arts = await arts.save()
        res.redirect(`/article/${arts.id}`)

    }catch(e){
        console.log(e);
        res.render('new',{article: arts})
    }

})

router.put('/:id',async(req,res,next)=>{
    req.article = await Article.findById(req.params.id)
    next()

},saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
    
     await Article.findByIdAndDelete(req.params.id)
     res.redirect('/')
   
  })


  function saveArticleAndRedirect(path) {
    return async (req, res) => {
      let article = req.article
      article.title = req.body.title
      article.description = req.body.description
      article.markdown = req.body.markdown
      try {
        article = await article.save()
        res.redirect(`${article.id}`)
      } catch (e) {
        res.render(`${path}`, { article: article })
      }
    }
  }
   



module.exports = router
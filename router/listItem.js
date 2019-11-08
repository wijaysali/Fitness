const express = require('express')
const router = express.Router()
const pageListApi = require('../models/dbApi').listItemAPI

router.post('/items', (req, res) => {
	const listType = req.body.params.listType,
		  size = req.body.params.size,
		  curPage = req.body.params.curPage;

	pageListApi.findByType(listType, size, curPage)
		.then((items) => {
			pageListApi.findItemCount(listType).then((count) => {
				res.json({items,count})
			}).catch((err) => {
				res.json(err)
			})
		})
		.catch((err) => {
			res.json(err)
		})
})
module.exports = router
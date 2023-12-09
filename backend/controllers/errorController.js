const handleRouteError = (req, res) => {
	res.status(404)
	if (req.accepts('json')) res.json({ error: '404 Not Found' })
	else res.type('text').send('404 Not Found')
}

export { handleRouteError }

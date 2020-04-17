
export const renderOk = (res, content) => res.status(200).json(content);
export const renderCreated = (res, content) => res.status(201).json(content);
export const renderDeleted = (res, message) => res.status(200).json({ results: null, message });
export const renderBadRequest = (res, content) => res.status(400).json(content);
export const renderUnauthorized = (res, content) => res.status(401).json(content);
export const renderForbidden = (res, content) => res.status(403).json(content);
export const renderNotFound = (res, content) => res.status(404).json(content);
export const renderConflict = (res, content) => res.status(409).json(content);
export const renderInternalServerError = (res, content) => res.status(500).json(content);
export const renderBadGateway = (res, content) => res.status(502).json(content);
export const renderServiceUnavailable = (res, content) => res.status(503).json(content);
export const renderRedirect = (res, url) => res.redirect(url);
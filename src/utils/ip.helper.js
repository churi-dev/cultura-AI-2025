export function getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    console.log("Forwarded IP:", forwarded);
    console.log("Remote Address:", req.socket.remoteAddress);
    return forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;
}
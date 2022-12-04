import upload from "@/utils/upload.js"

const uploadImg = (file) => {
	return upload({
		url: "/upload",
		method: "POST",
		file,
	})
}


export default{
	uploadImg
}
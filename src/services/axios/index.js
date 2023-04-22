
import Request from '@/utils/request'
import Module from '../module'

export default {
  getData(id) {
    return Request.get(Module.Posts, '/1/comments', { postId: id })
  },
  setData(data) {
    return Request.post(Module.Posts, '/1/comments', { ...data })
  }
}
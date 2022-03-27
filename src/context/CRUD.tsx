import axios from 'axios'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { useAppSelector } from '../redux/app/hooks'

export type RequestPostProps = {
  title: string
  content: string
  username: string
}

export type ResponsePostProps = {
  id: number
  title: string
  content: string
  created_datetime: string
  username: string
}

type PostContextProps = {
  createPost: () => void
  updatePost: () => void
  deletePost: () => void
  getAllPosts: () => void
  postList: ResponsePostProps[]
  setPostList: Dispatch<SetStateAction<ResponsePostProps[]>>
  content: string
  setContent: Dispatch<SetStateAction<string>>
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  setSelectedPost: Dispatch<SetStateAction<number | null>>
  isDeleteModalOpen: boolean
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>
  isUpdateModalOpen: boolean
  setIsUpdateModalOpen: Dispatch<SetStateAction<boolean>>
}

export const AppContext = createContext({} as PostContextProps)

export const AppProvider: React.FC = (props) => {
  const [selectedPost, setSelectedPost] = useState<number | null>(null)
  const [postList, setPostList] = useState<ResponsePostProps[]>([])
  const [newPost, setNewPost] = useState<ResponsePostProps>()
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  const userState = useAppSelector((state) => state.user)

  const createPost = async () => {
    console.log(userState.username)
    console.log(title)
    console.log(content)
    const response = await axios.post('https://dev.codeleap.co.uk/careers/', {
      username: userState.username,
      title: title,
      content: content,
    })
    console.log(response.data)
    // const response = await axios.post('api/createPost', {
    //   username: userState.username,
    //   title: title,
    //   content: content,
    // })

    const result = response.data
    setNewPost(result)
    // return result
  }

  const getAllPosts = async () => {
    const response = await axios.get('https://dev.codeleap.co.uk/careers/')

    // console.log(response.data)
    // const response = await axios.get('/api/getAllPosts')

    const result: any[] = response.data.results
    // if (result.length > 0) {
    //   setPostList(result.reverse())
    // }
    setPostList(result)
  }

  const updatePost = async () => {
    const response = await axios.patch(
      `https://dev.codeleap.co.uk/careers/${selectedPost}/`,
      {
        title: title,
        content: content,
      }
    )

    // const response = await axios.patch('/api/updatePost/', {
    //   id: selectedPost,
    //   title: title,
    //   content: content,
    // })

    const result = response.data
    setNewPost(result)
  }

  const deletePost = async () => {
    const response = await axios.delete(
      `https://dev.codeleap.co.uk/careers/${selectedPost}/`
    )

    // if (selectedPost !== null) {
    //   const response = await axios.post('/api/deletePost', {
    //     id: selectedPost,
    //   })
    // }

    const newList = postList.filter((item) => item.id !== selectedPost)
    setPostList(newList)
  }

  useEffect(() => {
    getAllPosts()
  }, [newPost])

  return (
    <AppContext.Provider
      value={{
        createPost,
        deletePost,
        getAllPosts,
        updatePost,
        postList,
        setPostList,
        content,
        setContent,
        setTitle,
        title,
        setSelectedPost,
        isDeleteModalOpen,
        isUpdateModalOpen,
        setIsDeleteModalOpen,
        setIsUpdateModalOpen,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

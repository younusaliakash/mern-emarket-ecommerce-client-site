# __E-Market Ecommerce__
Live Link: https://emarket-ecommerce-site.web.app/

## **_Website features_** :

> User can see Different Rpducts card in Home UI 

> If the user hovers on the team card then the user will watch a mind-blowing effect.

> Users can buy any product by click BUY NOW button. If the user does not log in the this site it will show the login page before the show the checkout page. after login successfully system redirects to the Checkout page. On that page, the user will see the product which he BUY. after complete checkout user will get a notification about order complete or not. If the user visits the orders page user will see about his order history.
    
> If any user wants to add or remove any product, the user can do it from the admin page. the user adds a product using the product name, weight, price, and image on the add product menu of the admin page dashboard. and users can manage products from the manage product menu. but for those tasks user must be logged in to the site. otherwise, the system will be redirected to the log-in page.

> Add product will be available in home UI and delete product will be no longer to Home UI.


## **_Usage Function_** :
1. Hooks 
    * useEffect()
    ```js
    useEffect(() =>{
        fetch("url")
        .then((response) => response.json())
        .then( data => setData(data))
    },[])
    ```
    * useState()
    ```js
    const [name, setName] = useState([])
    ```
    * useParams()
    ```js
    const {id} = useParams()
    ```
2. React Router
    * Router
    * Route
    * Switch
    * Link

3. Authentication System (Using Firebase)
    * Create account by Email and Password
    * Log in Using social Provider
    * Log in using exiting email and password.

4. CRUD (Using MongoDB)
    
    | Thank you very much. |
    | ------------- |
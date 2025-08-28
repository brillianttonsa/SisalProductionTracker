import  {createContext, useContext, useState, useEffect} from 'react';
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.exp * 1000 > Date.now()) {
                    setUser({ 
                        id: payload.userId,
                        username: payload.username,
                        role: payload.role
                    });
                } else {
                    localStorage.removeItem('token');
                } 
                } catch (error) {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        }
    ,[]);

    const login = async (username, password) => {
        try{
            const response = await api.post('/auth/login', {username, password});
            const {user: userData, token} = response.data;

            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(userData);

            return {success: true};
        } catch(error){
            return {success: false, error: error.response?.data?.message || 'Login failed'};
        }
    }

    const register = async (userData) => {
        try {
            const respone = await api.post('/auth/register', userData);
            const { user: newUser, token } = respone.data;

            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser(newUser);
            
            return { success: true };
        } catch (error){
            return { success: false, error: error.response?.data?.message || 'Registration failed' };
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    }

    const value = {
        user,
        loading,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}
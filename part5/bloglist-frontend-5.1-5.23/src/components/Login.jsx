import loginService from './../services/login';
import ez from './../utils/ez';

const LoginForm = (
    {
        username,
        setUsername,
        password,
        setPassword,
        setToastMessage,
    }
) => {

    const handleLogin = (e) => {
        e.preventDefault();
        loginService.login(username, password)
            .then(response => {
                setToastMessage({
                    message: `Welcome again ${username}`,
                    type: 'ok',
                });
                console.log('Loggin request response', response);
            })
            .catch(() => {
                setToastMessage({ message: 'User or password are invalid.', type: 'err' });
            });
    };

    return (
        <div className="centerContent">
            <form onSubmit={handleLogin}>
                <div>
            username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={ez.textInputFnGen(setUsername)}
                    />
                </div>
                <div>
            password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={ez.textInputFnGen(setPassword)}
                    />
                </div>
                <div className="centerContent">
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
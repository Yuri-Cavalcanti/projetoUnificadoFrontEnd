import axios from "axios";

// Criando a instância do Axios com a configuração base
const api = axios.create({
  baseURL: "http://localhost:8080/api/", // Altere para sua API
  timeout: 10000, // Tempo limite da requisição (10s)
});

// Interceptor de resposta para capturar erros
api.interceptors.response.use(
  (response) => {
    // Se a resposta for bem-sucedida, apenas retornamos
    return response;
  },
  (error) => {
    // Verifica se o erro tem resposta da API
    if (error.response) {
      console.error("Erro na resposta da API:", error.response);

      // Personalizar mensagem de erro com base no status
      switch (error.response.status) {
        case 400:
          alert("Requisição inválida!\n" + error.response.data);
          break;
        case 404:
          alert("Recurso não encontrado!\n" + error.response.data);
          break;
        case 417:
          alert("Promessa de api não cumprida!\n"+ error.response.data);
          break;
        case 500:
          alert("Erro no servidor! Tente novamente mais tarde.\n" + error.response.data);
          break;
        default:
          alert("Ocorreu um erro inesperado.\n" + error.response.data);
      }
    } else if (error.request) {
      // Caso não tenha resposta da API (timeout, erro de rede)
      console.error("Erro na requisição:", error.request);
      alert("Erro de conexão. Verifique sua internet ou o servidor.");
    } else {
      // Outros erros não relacionados à requisição
      console.error("Erro inesperado:", error.message);
      alert("Erro desconhecido. Contate o suporte.");
    }

    // Retornar a Promise rejeitada para que a chamada original possa tratar se necessário
    return Promise.reject(error);
  }
);

// Exportar a instância configurada para ser usada nos serviços
export default api;

export type Usuario = {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
};

export type UsuarioLogin = Pick<Usuario, "email" | "senha">;


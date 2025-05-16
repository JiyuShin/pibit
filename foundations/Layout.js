import Head from 'next/head';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.header`
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a`
  color: #333;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #666;
  }
`;

const Footer = styled.footer`
  padding: 2rem 0;
  text-align: center;
  margin-top: 4rem;
  border-top: 1px solid #eaeaea;
  color: #666;
`;

export default function Layout({ children, title = '디자이너 포트폴리오' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="미니멀한 디자이너 포트폴리오" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header>
          <Logo>PORTFOLIO</Logo>
          <Nav>
            <NavLink href="/">작업</NavLink>
            <NavLink href="/about">소개</NavLink>
            <NavLink href="/contact">연락처</NavLink>
          </Nav>
        </Header>
        <main>{children}</main>
        <Footer>
          © {new Date().getFullYear()} 미니멀 디자인 포트폴리오
        </Footer>
      </Container>
    </>
  );
} 
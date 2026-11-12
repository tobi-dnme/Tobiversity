import "./comp-styles/Header.css"

type HeaderProps = {
    organisation: string,
    name: string
}

function Header({ organisation, name }: HeaderProps) {
  return (
    <div className="greeting">
      <h1>{organisation}</h1>
      <p>Hello {name}. This should be fun :).</p>
    </div>
  )
}

export default Header;
import clsx from 'clsx'

import {
    Button, 
} from '@mui/material'




type ComponentProps = {
    text?: string
    onClick?: any
    isSecondary?: boolean
    isOutlined?: boolean
    styles?: object
    isFlat?: boolean
    isError?: boolean
    classes?: Array<string>
    startIcon?: any 
    endIcon?: any
    size?: any
  }
const ButtonComponent = ({ isFlat, text, onClick, isSecondary, isOutlined, styles, classes=[], startIcon, endIcon, size, isError }: ComponentProps)=> {
 
  if( isError ) {
    styles = {
        ...styles,
        backgroundColor: isOutlined ? 'white' : 'red',
        borderColor: isOutlined ? 'red' : 'transparent',
    }
  }

  return (
    <Button
      size={ size || 'medium' }
      variant={ isOutlined ? "outlined" : "contained" }
      color={ isSecondary ? "secondary" : "primary" }
      onClick={onClick ? onClick : null}
      startIcon={startIcon}
      endIcon={endIcon}
      disableElevation={isFlat ?? true}
      className={
        clsx([
          ...classes
        ])
      }
      style={{
        fontWeight: 700,
        borderRadius: '40px',
        padding: '4px 20px',
        textTransform: 'none',
        maxWidth: '440px',
        // padding: isWide ? '8px 16px' : '6px 24px',
        ...styles
      }}
    >
      {text}
    </Button>
  )
}

export default ButtonComponent
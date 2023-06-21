
	


	include 'include/opengl.inc'





Main:
	;sub	rsp,8		; Make stack dqword aligned



	mov rax,960
	mov [screen.iwidth],rax
	mov rax,960
	mov [screen.iheight],rax

	



	invoke	GetModuleHandle,0
	mov	[wc.hInstance],rax
	invoke	LoadIcon,0,IDI_APPLICATION
	mov	[wc.hIcon],rax
	invoke	LoadCursor,0,IDC_ARROW
	mov	[wc.hCursor],rax
	invoke	RegisterClass,wc
	invoke	CreateWindowEx,0,_class,_title,WS_VISIBLE+WS_OVERLAPPEDWINDOW+WS_CLIPCHILDREN+WS_CLIPSIBLINGS,16,16,[screen.iwidth],[screen.iheight],NULL,NULL,[wc.hInstance],NULL

  msg_loop:
	invoke	GetMessage,addr msg,NULL,0,0
	cmp	eax,1
	jb	end_loop
	jne	msg_loop
	invoke	TranslateMessage,addr msg
	invoke	DispatchMessage,addr msg
	jmp	msg_loop

  end_loop:
	invoke	ExitProcess,[msg.wParam]

proc WindowProc uses rbx rsi rdi, hwnd,wmsg,wparam,lparam
	mov	[hwnd],rcx
	frame
	cmp	edx,WM_CREATE
	je	.wmcreate
	cmp	edx,WM_SIZE
	je	.wmsize
	cmp	edx,WM_PAINT
	je	.wmpaint
	cmp	edx,WM_KEYDOWN
	je	.wmkeydown
	cmp	edx,WM_DESTROY
	je	.wmdestroy
  .defwndproc:
	invoke	DefWindowProc,rcx,rdx,r8,r9
	jmp	.finish
  .wmcreate:
	invoke	GetDC,rcx
	mov	[hdc],rax
	lea	rdi,[pfd]
	mov	rcx,sizeof.PIXELFORMATDESCRIPTOR shr 3
	xor	eax,eax
	rep	stosq
	mov	[pfd.nSize],sizeof.PIXELFORMATDESCRIPTOR
	mov	[pfd.nVersion],1
	mov	[pfd.dwFlags],PFD_SUPPORT_OPENGL+PFD_DOUBLEBUFFER+PFD_DRAW_TO_WINDOW
	mov	[pfd.iLayerType],PFD_MAIN_PLANE
	mov	[pfd.iPixelType],PFD_TYPE_RGBA
	mov	[pfd.cColorBits],16
	mov	[pfd.cDepthBits],16
	mov	[pfd.cAccumBits],0
	mov	[pfd.cStencilBits],0
	invoke	ChoosePixelFormat,[hdc],addr pfd
	invoke	SetPixelFormat,[hdc],eax,addr pfd
	invoke	wglCreateContext,[hdc]
	mov	[hrc],rax
	invoke	wglMakeCurrent,[hdc],[hrc]
	invoke	GetClientRect,[hwnd],addr rc
	invoke	glViewport,0,0,[rc.right],[rc.bottom]
	invoke	GetTickCount
	mov	[clock],eax
	xor	eax,eax
	jmp	.finish
  .wmsize:
	invoke	GetClientRect,[hwnd],addr rc
	invoke	glViewport,0,0,[rc.right],[rc.bottom]
	xor	eax,eax
	jmp	.finish
  .wmpaint:
	invoke	GetTickCount
	sub	eax,[clock]
	cmp	eax,10
	jb	.animation_ok
	add	[clock],eax
	invoke	glRotatef,float [theta],float dword 0.0,float dword 0.0,float dword 1.0
      .animation_ok:
	invoke	glClear,GL_COLOR_BUFFER_BIT
	invoke	glBegin,GL_QUADS
	invoke	glColor3f,float dword 1.0,float dword 0.1,float dword 0.1
	invoke	glVertex3d,float -0.6,float -0.6,float 0.0
	invoke	glColor3f,float dword 0.1,float dword 0.1,float dword 0.1
	invoke	glVertex3d,float 0.6,float -0.6,float 0.0
	invoke	glColor3f,float dword 0.1,float dword 0.1,float dword 1.0
	invoke	glVertex3d,float 0.6,float 0.6,float 0.0
	invoke	glColor3f,float dword 1.0,float dword 0.1,float dword 1.0
	invoke	glVertex3d,float -0.6,float 0.6,float 0.0
	invoke	glEnd
	invoke	SwapBuffers,[hdc]
	xor	eax,eax
	jmp	.finish
  .wmkeydown:
	cmp	r8d,VK_ESCAPE
	jne	.defwndproc
  .wmdestroy:
	invoke	wglMakeCurrent,0,0
	invoke	wglDeleteContext,[hrc]
	invoke	ReleaseDC,[hwnd],[hdc]
	invoke	PostQuitMessage,0
	xor	eax,eax
  .finish:
	endf
	ret
endp



	screen SCREEN

  _title db 'aYi - worzala scene',0
  _class db 'AYIWORZALA',0

  theta GLfloat 0.6

  wc WNDCLASS style:0, lpfnWndProc:WindowProc, lpszClassName:_class

  hdc dq ?
  hrc dq ?

  msg MSG
  rc RECT
  pfd PIXELFORMATDESCRIPTOR

  clock dd ?


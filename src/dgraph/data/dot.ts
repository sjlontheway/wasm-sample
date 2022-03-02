export const dotExampleString = `
digraph G {
    graph [ratio = "auto",splines="true"];
    node [shape=plaintext, margin="0.2,0"];
BBHeader [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD> CFG Header </TD></TR></TABLE>>];
BB0x10e80 [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010e80 :  Twoway BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10e80</TD><TD ALIGN="LEFT" ROWSPAN="1">	cbz	x1, #0x10fc8</TD></TR>
</TABLE>>];
BB0x10fc8 [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010fc8 :  Ret BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10fc8</TD><TD ALIGN="LEFT" ROWSPAN="1">	mov	w0, #-1</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10fcc</TD><TD ALIGN="LEFT" ROWSPAN="1">	ret	</TD></TR>
</TABLE>>];
BB0x10e84 [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010e84 :  Twoway BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10e84</TD><TD ALIGN="LEFT" ROWSPAN="1">	stp	x29, x30, [sp, #-0x20]!</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10e88</TD><TD ALIGN="LEFT" ROWSPAN="1">	mov	x29, sp</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10e8c</TD><TD ALIGN="LEFT" ROWSPAN="1">	stp	x19, x20, [sp, #0x10]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10e90</TD><TD ALIGN="LEFT" ROWSPAN="1">	mov	x19, x1</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10e94</TD><TD ALIGN="LEFT" ROWSPAN="1">	ldr	w1, [x1, #0x18]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10e98</TD><TD ALIGN="LEFT" ROWSPAN="1">	mov	w20, w0</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10e9c</TD><TD ALIGN="LEFT" ROWSPAN="1">	mov	w0, #0x1c4f</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10ea0</TD><TD ALIGN="LEFT" ROWSPAN="1">	cmp	w1, w0</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10ea4</TD><TD ALIGN="LEFT" ROWSPAN="1">	b.ne	#0x10f38</TD></TR>
</TABLE>>];
BB0x10f38 [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010f38 :  Oneway BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f38</TD><TD ALIGN="LEFT" ROWSPAN="1">	mov	w0, #-1</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f3c</TD><TD ALIGN="LEFT" ROWSPAN="1">	b	#0x10f14</TD></TR>
</TABLE>>];
BB0x10ea8 [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010ea8 :  Twoway BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10ea8</TD><TD ALIGN="LEFT" ROWSPAN="1">	ldr	w0, [x19, #0x6c]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10eac</TD><TD ALIGN="LEFT" ROWSPAN="1">	cmp	w0, #0</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10eb0</TD><TD ALIGN="LEFT" ROWSPAN="1">	ccmn	w0, #5, #4, ne</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10eb4</TD><TD ALIGN="LEFT" ROWSPAN="1">	b.ne	#0x10f38</TD></TR>
</TABLE>>];
BB0x10eb8 [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010eb8 :  Twoway BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10eb8</TD><TD ALIGN="LEFT" ROWSPAN="1">	ldr	w0, [x19, #0x68]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10ebc</TD><TD ALIGN="LEFT" ROWSPAN="1">	cbnz	w0, #0x10f20</TD></TR>
</TABLE>>];
BB0x10f20 [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010f20 :  Computed call BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f20</TD><TD ALIGN="LEFT" ROWSPAN="1">	ldr	x1, [x19, #0x60]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f24</TD><TD ALIGN="LEFT" ROWSPAN="1">	str	wzr, [x19, #0x68]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f28</TD><TD ALIGN="LEFT" ROWSPAN="1">	mov	x0, x19</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f2c</TD><TD ALIGN="LEFT" ROWSPAN="1">	bl	#0x10928</TD></TR>
</TABLE>>];
BB0x10ec0 [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010ec0 :  Twoway BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10ec0</TD><TD ALIGN="LEFT" ROWSPAN="1">	tbnz	w20, #0x1f, #0x10f38</TD></TR>
</TABLE>>];
BB0x10ec4 [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010ec4 :  Twoway BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10ec4</TD><TD ALIGN="LEFT" ROWSPAN="1">	ldr	w3, [x19]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10ec8</TD><TD ALIGN="LEFT" ROWSPAN="1">	ldr	w0, [x19, #0x28]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10ecc</TD><TD ALIGN="LEFT" ROWSPAN="1">	lsl	w0, w0, #1</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10ed0</TD><TD ALIGN="LEFT" ROWSPAN="1">	cbz	w3, #0x10f40</TD></TR>
</TABLE>>];
BB0x10f40 [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010f40 :  Ret BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f40</TD><TD ALIGN="LEFT" ROWSPAN="1">	ldr	x2, [x19, #0x38]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f44</TD><TD ALIGN="LEFT" ROWSPAN="1">	sub	x1, x0, #1</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f48</TD><TD ALIGN="LEFT" ROWSPAN="1">	mov	w3, #1</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f4c</TD><TD ALIGN="LEFT" ROWSPAN="1">	str	w3, [x19]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f50</TD><TD ALIGN="LEFT" ROWSPAN="1">	add	x3, x2, x1</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f54</TD><TD ALIGN="LEFT" ROWSPAN="1">	str	x3, [x19, #8]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f58</TD><TD ALIGN="LEFT" ROWSPAN="1">	strb	w20, [x2, x1]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f5c</TD><TD ALIGN="LEFT" ROWSPAN="1">	mov	w0, w20</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f60</TD><TD ALIGN="LEFT" ROWSPAN="1">	str	wzr, [x19, #0x54]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f64</TD><TD ALIGN="LEFT" ROWSPAN="1">	ldr	x1, [x19, #0x10]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f68</TD><TD ALIGN="LEFT" ROWSPAN="1">	sub	x1, x1, #1</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f6c</TD><TD ALIGN="LEFT" ROWSPAN="1">	str	x1, [x19, #0x10]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f70</TD><TD ALIGN="LEFT" ROWSPAN="1">	ldp	x19, x20, [sp, #0x10]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f74</TD><TD ALIGN="LEFT" ROWSPAN="1">	ldp	x29, x30, [sp], #0x20</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f78</TD><TD ALIGN="LEFT" ROWSPAN="1">	ret	</TD></TR>
</TABLE>>];
BB0x10ed4 [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010ed4 :  Twoway BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10ed4</TD><TD ALIGN="LEFT" ROWSPAN="1">	cmp	w3, w0</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10ed8</TD><TD ALIGN="LEFT" ROWSPAN="1">	b.eq	#0x10fac</TD></TR>
</TABLE>>];
BB0x10fac [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010fac :  Computed call BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10fac</TD><TD ALIGN="LEFT" ROWSPAN="1">	mov	x0, x19</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10fb0</TD><TD ALIGN="LEFT" ROWSPAN="1">	adrp	x2, #0x16000</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10fb4</TD><TD ALIGN="LEFT" ROWSPAN="1">	mov	w1, #-3</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10fb8</TD><TD ALIGN="LEFT" ROWSPAN="1">	add	x2, x2, #0x520</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10fbc</TD><TD ALIGN="LEFT" ROWSPAN="1">	bl	#0x10098</TD></TR>
</TABLE>>];
BB0x10edc [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010edc :  Twoway BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10edc</TD><TD ALIGN="LEFT" ROWSPAN="1">	ldr	x1, [x19, #8]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10ee0</TD><TD ALIGN="LEFT" ROWSPAN="1">	ldr	x4, [x19, #0x38]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10ee4</TD><TD ALIGN="LEFT" ROWSPAN="1">	cmp	x1, x4</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10ee8</TD><TD ALIGN="LEFT" ROWSPAN="1">	b.eq	#0x10f7c</TD></TR>
</TABLE>>];
BB0x10f7c [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010f7c :  Twoway BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f7c</TD><TD ALIGN="LEFT" ROWSPAN="1">	add	x2, x1, w3, uxtw</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f80</TD><TD ALIGN="LEFT" ROWSPAN="1">	add	x1, x1, w0, uxtw</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f84</TD><TD ALIGN="LEFT" ROWSPAN="1">	cmp	x4, x2</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f88</TD><TD ALIGN="LEFT" ROWSPAN="1">	b.hs	#0x10eec</TD></TR>
</TABLE>>];
BB0x10eec [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010eec :  Fall BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10eec</TD><TD ALIGN="LEFT" ROWSPAN="1">	sub	x2, x1, #1</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10ef0</TD><TD ALIGN="LEFT" ROWSPAN="1">	add	w3, w3, #1</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10ef4</TD><TD ALIGN="LEFT" ROWSPAN="1">	str	w3, [x19]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10ef8</TD><TD ALIGN="LEFT" ROWSPAN="1">	mov	w0, w20</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10efc</TD><TD ALIGN="LEFT" ROWSPAN="1">	str	x2, [x19, #8]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f00</TD><TD ALIGN="LEFT" ROWSPAN="1">	sturb	w20, [x1, #-1]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f04</TD><TD ALIGN="LEFT" ROWSPAN="1">	str	wzr, [x19, #0x54]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f08</TD><TD ALIGN="LEFT" ROWSPAN="1">	ldr	x1, [x19, #0x10]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f0c</TD><TD ALIGN="LEFT" ROWSPAN="1">	sub	x1, x1, #1</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f10</TD><TD ALIGN="LEFT" ROWSPAN="1">	str	x1, [x19, #0x10]</TD></TR>
</TABLE>>];
BB0x10f14 [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010f14 :  Ret BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f14</TD><TD ALIGN="LEFT" ROWSPAN="1">	ldp	x19, x20, [sp, #0x10]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f18</TD><TD ALIGN="LEFT" ROWSPAN="1">	ldp	x29, x30, [sp], #0x20</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f1c</TD><TD ALIGN="LEFT" ROWSPAN="1">	ret	</TD></TR>
</TABLE>>];
BB0x10f30 [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010f30 :  Twoway BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f30</TD><TD ALIGN="LEFT" ROWSPAN="1">	cmn	w0, #1</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f34</TD><TD ALIGN="LEFT" ROWSPAN="1">	b.ne	#0x10ec0</TD></TR>
</TABLE>>];
BB0x10fc0 [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010fc0 :  Oneway BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10fc0</TD><TD ALIGN="LEFT" ROWSPAN="1">	mov	w0, #-1</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10fc4</TD><TD ALIGN="LEFT" ROWSPAN="1">	b	#0x10f14</TD></TR>
</TABLE>>];
BB0x10f8c [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010f8c :  Fall BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f8c</TD><TD ALIGN="LEFT" ROWSPAN="1">	nop	</TD></TR>
</TABLE>>];
BB0x10f90 [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010f90 :  Twoway BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f90</TD><TD ALIGN="LEFT" ROWSPAN="1">	ldrb	w0, [x2, #-1]!</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f94</TD><TD ALIGN="LEFT" ROWSPAN="1">	strb	w0, [x1, #-1]!</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f98</TD><TD ALIGN="LEFT" ROWSPAN="1">	ldr	x0, [x19, #0x38]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10f9c</TD><TD ALIGN="LEFT" ROWSPAN="1">	cmp	x0, x2</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10fa0</TD><TD ALIGN="LEFT" ROWSPAN="1">	b.lo	#0x10f90</TD></TR>
</TABLE>>];
BB0x10fa4 [ label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
<TR><TD ALIGN="LEFT"   COLSPAN="2">Label 0x00010fa4 :  Oneway BB</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10fa4</TD><TD ALIGN="LEFT" ROWSPAN="1">	ldr	w3, [x19]</TD></TR>
<TR><TD ALIGN="LEFT" ROWSPAN="1">0x10fa8</TD><TD ALIGN="LEFT" ROWSPAN="1">	b	#0x10eec</TD></TR>
</TABLE>>];
BBHeader -> BB0x10e80[headport="n", tailport="s"];
BB0x10e80 -> BB0x10fc8[headport="n", tailport="s"];
BB0x10e80 -> BB0x10e84[headport="n", tailport="s"];
BB0x10e84 -> BB0x10f38[headport="n", tailport="s"];
BB0x10e84 -> BB0x10ea8[headport="n", tailport="s"];
BB0x10f38 -> BB0x10f14[headport="n", tailport="s"];
BB0x10ea8 -> BB0x10f38[headport="n", tailport="s"];
BB0x10ea8 -> BB0x10eb8[headport="n", tailport="s"];
BB0x10eb8 -> BB0x10f20[headport="n", tailport="s"];
BB0x10eb8 -> BB0x10ec0[headport="n", tailport="s"];
BB0x10f20 -> BB0x10f30[headport="n", tailport="s"];
BB0x10ec0 -> BB0x10f38[headport="n", tailport="s"];
BB0x10ec0 -> BB0x10ec4[headport="n", tailport="s"];
BB0x10ec4 -> BB0x10f40[headport="n", tailport="s"];
BB0x10ec4 -> BB0x10ed4[headport="n", tailport="s"];
BB0x10ed4 -> BB0x10fac[headport="n", tailport="s"];
BB0x10ed4 -> BB0x10edc[headport="n", tailport="s"];
BB0x10fac -> BB0x10fc0[headport="n", tailport="s"];
BB0x10edc -> BB0x10f7c[headport="n", tailport="s"];
BB0x10edc -> BB0x10eec[headport="n", tailport="s"];
BB0x10f7c -> BB0x10eec[headport="n", tailport="s"];
BB0x10f7c -> BB0x10f8c[headport="n", tailport="s"];
BB0x10eec -> BB0x10f14[headport="n", tailport="s"];
BB0x10f30 -> BB0x10ec0[headport="n", tailport="s"];
BB0x10f30 -> BB0x10f38[headport="n", tailport="s"];
BB0x10fc0 -> BB0x10f14[headport="n", tailport="s"];
BB0x10f8c -> BB0x10f90[headport="n", tailport="s"];
BB0x10f90 -> BB0x10f90[headport="n", tailport="s"];
BB0x10f90 -> BB0x10fa4[headport="n", tailport="s"];
BB0x10fa4 -> BB0x10eec[headport="n", tailport="s"];
subgraph cluster_0x7ffed5f7fcf0{
label="NO_CYCLE_UNKNOWN";
bgcolor="deepskyblue1";
BB0x10f14;
BB0x10f38;
BB0x10e80;
BB0x10ea8;
BB0x10ec0;
BB0x10ec4;
BB0x10f40;
BB0x10eb8;
BB0x10fc8;
subgraph cluster_0x0x7ffed5ebc550{
label="BLOCK";
bgcolor="azure3";
BB0x10f30;
BB0x10f20;
}
BB0x10e84;
subgraph cluster_0x7ffed60670f0{
label="IF_THEN_ELSE";
bgcolor="aquamarine";
BB0x10ed4;
subgraph cluster_0x7ffed5ebb3a0{
label="PROPER";
bgcolor="goldenrod2";
BB0x10edc;
BB0x10f7c;
BB0x10eec;
subgraph cluster_0x0x7ffed5ebb0e0{
label="BLOCK";
bgcolor="azure3";
BB0x10f8c;
BB0x10fa4;
subgraph cluster_0x7ffed5eeb610{
label="SELF_LOOP";
bgcolor="darkolivegreen2";
BB0x10f90;
}
}
}
subgraph cluster_0x0x7ffed5f80020{
label="BLOCK";
bgcolor="azure3";
BB0x10fac;
BB0x10fc0;
}
}
}
}
`;

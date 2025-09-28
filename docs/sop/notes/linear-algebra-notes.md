---
title: 高等代数笔记
date: 2025-01-20 14:30:00
descriptionHTML: '<span style="color:var(--description-font-color);">纯情男大自用线性代数笔记</span>'
tags:
  - 数学
  - 笔记
sidebar: true
readingTime: true
hidden: false
recommend: true
---

# 高等代数笔记


## 下载


#### 第一章：线性方程组
- **Markdown源码**：[高等代数第一章.md](https://github.com/handsomezhuzhu//Linear-Algebra-note/raw/main/高等代数笔记/高等代数第一章.md)
- **PDF版本**：[高等代数第一章.pdf](https://github.com/handsomezhuzhu//Linear-Algebra-note/raw/main/高等代数笔记/高等代数第一章.pdf)

#### 第二章：矩阵
- **Markdown源码**：[高等代数第二章.md](https://github.com/handsomezhuzhu//Linear-Algebra-note/raw/main/高等代数笔记/高等代数第二章.md)
- **PDF版本**：[高等代数第二章.pdf](https://github.com/handsomezhuzhu//Linear-Algebra-note/raw/main/高等代数笔记/高等代数第二章.pdf)

#### 第三章：向量空间
- **Markdown源码**：[高等代数第三章.md](https://github.com/handsomezhuzhu//Linear-Algebra-note/raw/main/高等代数笔记/高等代数第三章.md)
- **PDF版本**：[高等代数第三章.pdf](https://github.com/handsomezhuzhu//Linear-Algebra-note/raw/main/高等代数笔记/高等代数第三章.pdf)

#### 第四章：线性变换
- **Markdown源码**：[高等代数第四章.md](https://github.com/handsomezhuzhu//Linear-Algebra-note/raw/main/高等代数笔记/高等代数第四章.md)
- **PDF版本**：[高等代数第四章.pdf](https://github.com/handsomezhuzhu//Linear-Algebra-note/raw/main/高等代数笔记/高等代数第四章.pdf)

#### 第五章：多项式
- **Markdown源码**：[高等代数第五章.md](https://github.com/handsomezhuzhu//Linear-Algebra-note/raw/main/高等代数笔记/高等代数第五章.md)
- **PDF版本**：[高等代数第五章.pdf](https://github.com/handsomezhuzhu//Linear-Algebra-note/raw/main/高等代数笔记/高等代数第五章.pdf)

#### 第六章：矩阵的标准形
- **Markdown源码**：[高等代数第六章.md](https://github.com/handsomezhuzhu//Linear-Algebra-note/raw/main/高等代数笔记/高等代数第六章.md)
- **PDF版本**：[高等代数第六章.pdf](https://github.com/handsomezhuzhu//Linear-Algebra-note/raw/main/高等代数笔记/高等代数第六章.pdf)

#### 第七章：二次型
- **Markdown源码**：[高等代数第七章.md](https://github.com/handsomezhuzhu//Linear-Algebra-note/raw/main/高等代数笔记/高等代数第七章.md)
- **PDF版本**：[高等代数第七章.pdf](https://github.com/handsomezhuzhu//Linear-Algebra-note/raw/main/高等代数笔记/高等代数第七章.pdf)



## 第一章

### 1.1 线性方程组
#### (1) 矩阵与增广矩阵
  $$
  2x_1 - x_2 + 1.5x_3 = 8
  $$
  $$
  x_1 - 4x_3 = -7
  $$

* 矩阵 (Matrix)

$$
\begin{bmatrix}
2 & -1 & 1.5\\
1 & 0 & -4
\end{bmatrix}
$$

* 增广矩阵 (Augmented Matrix)

$$
\begin{bmatrix}
2 & -1 & 1.5 & 8\\
1 & 0 & -4 & -7
\end{bmatrix}
$$

* 线性方程组解的三种情况：  
1. 无解 (不相容) (incompatibility)  
2. 有唯一解 (相容) (compatibility)  
3. 有无穷多解 (相容) (compatibility)  


#### (2) 矩阵变换

* 倍加
* 对换
* 倍乘
  

### 1.2 行化简与阶梯形矩阵

>**先导元素 (Leading element)**  
**定义**  
一个矩阵称为阶梯形(或行阶梯形),若它有以下三个性质:  
l.每一非零行都在每一零行之上.  
2.某一行的先导元素所在的列位于前一行先导元素的右边  
3.某一先导元素所在列下方元素都是零.  
若一个阶梯形矩阵还满足以下性质,贝则称它为简化阶梯形(或简化行阶梯形) .  
4.每一非零行的先导元素是 1.  
5.每一先导元素 1 是该元素所在列的唯一非零元素  



>**定理1** (简化阶梯形矩阵的唯一性)  
每个矩阵行等价于唯一的简化阶梯形矩阵.


>**主元位置 (Pivot position)**  
**定义**  
矩阵中的主元位置是A中对应于它的阶梯形中先导元素 1 的位直.主元列是$A$的含有主元往直的列

>**定理2** (存在与唯一性定理)  
线性方程组相容的充要条件是增广矩阵的最右列不是主元列.也就是说增广矩阵的阶梯形没有形如  
$[0 \ \  \cdots \ \   0 \ \  b] \ \ ,\ \   b\neq0$

>的行若线性方程组相容,则它的解集可能有两种情形:   
( i )当没有自由变量时,有唯一解;  
( ii )若至少有一个自由变量,则有无穷多解.

### 1.3 向量方程

$$u=
\begin{bmatrix}
\ 2 \ \\
\ 1 \ 
\end{bmatrix}
$$

>满足加法乘法的性质

* 线性组合
  $y=x_1c_1+\cdots+x_ic_i$ 中 $c_i$ 为权
  
* 向量张成 (生成)
  
  $span\{x_1,x_2,\cdots,x_i\}$
  即判断
  $y=x_1c_1+\cdots+x_ic_i$
  是否有解；或
  $\begin{bmatrix}
  \ x_1\ x_2\ \cdots \  x_3 \ y\\
  \end{bmatrix}$
  是否有解

### 1.4 矩阵方程 Ax=b

>**定义**  
若$A$是$m \times n$矩阵,它的各列为  $a$   
若 $x$ 是$R$<sup>n</sup>中的向量,则 $A$ 与 $x$ 的积(记为$Ax$) 就是 $A$ 的各列以 $x$ 中对应元素为权的线性组合

>**定理3**  
$Ax=b$
等价于
$\begin{bmatrix}
  \ a_1\ a_2\ \cdots \  a_3 \ \ b\\
  \end{bmatrix}$


* 解的存在性
  
>**方程Ax = b 有解当且仅当 b 是 A 的各列的线性组合.**



>**定理4**  
设 $A$ 是 $m \times n$ 矩阵,则下列命题是逻辑上等价的.  
也就是说,对某个 $Ax = b$ 它们都成立或者都不成立.  
a. 对$R$<sup>m</sup>中每个 $b$ ,方程 $Ax=b$ 有解.  
b. $R$<sup>m</sup>中的每个 $b$ 都是 $A$ 的列的一个线性组合.  
c. $A$ 的各列生成$R$<sup>m</sup>.  
d. $A$ 在每一行都有一个主元位置.

>**计算**  
计算 $Ax$ 的行-向量规则  
若乘积 $Ax$ 有定义,则 $Ax$ 中的第 $i$ 个元素是 $A$ 的第 $i$ 行元素与 $x$ 的相应元素乘积之和.

>**定理5**  
若 $A$ 是 $m\times n$ 矩阵,$u$ 和 $v$ 是$R$<sup>n</sup>中向量, $c$ 是标量,如:  
a. $A(u+v) = Au+Av.$  
b. $A(cu) = c(Au).$

### 1.5 线性方程组的解集
* 齐次线性方程组
  
>齐次方程 $Ax=0$ 有非平凡解当且仅当方程至少有一个自由变量.

>**定理6**  
设方程 $Ax=b$ 对某个 $b$ 是相容的, $p$ 为一个特解,则 $Ax=b$ 的解集是所有形如
$w = p+v_h$
>的向量的集, 其中 $v$<sub>h</sub> 是齐次方程 $Ax=0$ 的任意一个解.

### 1.7 线性无关

>**定义**  
向量方程 $0=x_1c_1+\cdots+x_ic_i$ 仅有平凡解(trivial solution)  向量组 (集) 称为线性无关的 (linearly independent)  
若存在不全为零的权
$c_i$
使
$x_1c_1+\cdots+x_ic_i+0$
则向量组 (集) 称为线性相关的 (linearly dependent)

>**矩阵 $A$ 的各列线性无关,当且仅当方程 $Ax=0$ 仅有平凡**

>**定理7** (线性相关集的特征)  
两个或更多个向量的集合
$S=\{v_1,v_2,\cdots,v_p\}$
>线性相关,当且仅当 $S$ 中至少有一个向量是其他向量的线性组合.

>**定理8**  
若一个向量组的向量个数超过每个向量的元素个数,那么这个向量组线性相关.就
是说, $R$<sup>n</sup> 中任意向量组
$\{v_1,v_2,\cdots,v_p\}$
>当 $p>n$ 时线性相关.

>**定理9**  
若 $R$<sup>n</sup> 中向量组
$S=\{v_1,v_2,\cdots,v_p\}$
>包含零向量,则它线性相关

### 1.8 线性变换介绍
* 变换(transformation)(或称函数、映射(map)) $T$ 是一个规则
* $T$ : $R$<sup>n</sup> → $R$<sup>m</sup>  
  $R$<sup>n</sup>称为 $T$ 的定义域 (domain)  
  $R$<sup>m</sup>称为 $T$ 的余定义域 (codomain) (或取值空间)

* 线性变换
$$T(0) = 0$$
$$T(cu+ dv) = cT(u) + dT(v)$$

### 1.9 线性变换的矩阵

>**定理10**  
设 $T$ : $R$<sup>n</sup> → $R$<sup>m</sup> 为线性变换,则存在唯一的矩阵 $A$ ,使得对 $R$<sup>n</sup>中一切 $x$ 满足 $T(x)=Ax$

* 满射
  >映射 $T$ : $R$<sup>n</sup> → $R$<sup>m</sup> 称为到 $R$<sup>m</sup> 上的映射,若 $R$<sup>m</sup> 中每个 $b$ 是 $R$<sup>n</sup> 中至少一个 $x$ 的像.

  >“满射” 的英文是 “surjective” 或 “surjection” 或 “onto mapping” 或 “onto function”


* 单射
  >映射 $T$ : $R$<sup>n</sup> → $R$<sup>m</sup> 称为一对一映射(或1:1),若 $R$<sup>m</sup> 中每个 $b$ 是 $R$<sup>m</sup> 中至多一个 $x$ 的像.

  >“单射” 的英文是 “injective” 或 “injection” 或 “one-to-one mapping” 或 “one-to-one function”


>**定理11**  
设 $T$ : $R$<sup>n</sup> → $R$<sup>m</sup> 为线性变换,则 $T$ 是一对一的当且仅当方程 $Ax=0$ 仅有平凡解.

>**定理12**  
设 $T$ : $R$<sup>n</sup> → $R$<sup>m</sup> 为线性变换,设 $A$ 为 $T$ 的标准矩阵，则：  
a. $T$ 把 $R$<sup>n</sup> 映上到 $R$<sup>m</sup> ，当且仅当 $A$ 的列生成 $R$<sup>m</sup>.  
b. $T$ 是一对一的，当且仅当 $A$ 的列线性无关.

## 第二章

### 2.1 矩阵运算
加减乘
### 2.2 矩阵的逆
>不可逆矩阵有时称为**奇异矩阵**，而可逆矩阵也称为**非奇异矩阵**.
$$A^{-1}A=I$$
$$A^{-1}=\frac{1}{det A} \times A_{adj}$$
$A_{adj}$是伴随矩阵（adjugate matrix）
$$(A^{-1})^{-1}=A$$
$$(AB)^{-1}=A^{-1}B^{-1}$$

>若干个$n \times  n$ 可逆矩阵的积也是可逆的，其逆等于这些矩阵的逆按相反顺序的乘积
>~~看不懂，不爱用这种方法~~

求法（我常用）：
$$[\ A\ \ \ I\ ]=[\ I\ \ \ A^{-1}\ ]  $$

### 2.3 矩阵的特征

* 挺多的


### 2.4  分块矩阵
* 没什么特别的

### 2.5 LU分解
>L 是 $m \times m$ 下三角矩阵， 主对角线元素全是1，  
>$A=LU$  
>AI写的： 

* Doolittle分解（LU分解的一种常见形式）
* 原理 对于一个$n \times n$矩阵 $A$，将其分解为一个下三角矩阵$L$,主对角线元素为1和一个上三角矩阵$U$的乘积，即$A = LU$。
> 计算步骤   
> 1. **设定矩阵形式** 设
$$A=\left[\begin{array}{cccc}a_{11}&a_{12}&\cdots&a_{1n}\\a_{21}&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\end{array}\right]$$
$$L=\left[\begin{array}{cccc}1&0&\cdots&0\\l_{21}&1&\cdots&0\\\vdots&\vdots&\ddots&\vdots\\l_{n1}&l_{n2}&\cdots&1\end{array}\right]$$ 
$$U=\left[\begin{array}{cccc}u_{11}&u_{12}&\cdots&u_{1n}\\0&u_{22}&\cdots&u_{2n}\\\vdots&\vdots&\ddots&\vdots\\0&0&\cdots&u_{nn}\end{array}\right]$$
> 2. **计算$U$的第一行和$L$的第一列** 
$$u_{1j}=a_{1j}(j = 1,2,\cdots,n)$$ 
$$l_{i1}=\frac{a_{i1}}{u_{11}}(i = 2,3,\cdots,n)$$
> 3. **对于$k = 2,3,\cdots,n$，分别计算$U$的第$k$行和$L$的第$k$列计算$U$的第$k$行**： 
$$u_{kj}=a_{kj}-\sum_{m = 1}^{k - 1}l_{km}u_{mj}(j = k,k + 1,\cdots,n)$$
>**计算$L$的第$k$列**： 
$$l_{ik}=\frac{1}{u_{kk}}(a_{ik}-\sum_{m = 1}^{k - 1}l_{im}u_{mk})(i = k + 1,k + 2,\cdots,n)$$

>*示例*  
>对于矩阵
$$A=\left[\begin{array}{ccc}2&1&1\\4&3&3\\8&7&9\end{array}\right]$$
>1. **第一步计算**
>首先$u_{11}=2$， $u_{12}=1$，$u_{13}=1$，$l_{21}=\frac{4}{2}=2$，$l_{31}=\frac{8}{2}=4$
>2. **第二步计算** 然后计算  
>   $u_{22}=a_{22}-l_{21}u_{12}=3 - 2×1 = 1$，
>   $u_{23}=a_{23}-l_{21}u_{13}=3 - 2×1 = 1$
>4. **第三步计算**
$$l_{32}=\frac{1}{u_{22}}(a_{32}-l_{31}u_{12})=\frac{1}{1}(7 - 4×1)=3$$
>5. **第四步计算** 最后
$$u_{33}=a_{33}-l_{31}u_{13}-l_{32}u_{23}=9 - 4×1 - 3×1 = 2$$
>6. **得出结果** 得到
$$L=\left[\begin{array}{ccc}1&0&0\\2&1&0\\4&3&1\end{array}\right]$$
$$U=\left[\begin{array}{ccc}2&1&1\\0&1&1\\0&0&2\end{array}\right]$$

## 第三章

### 3.1 行列式介绍
* 人话版本：
>我的方法：  
>1、选择一行零最多的，  
>2、他的位置是第（$i$，$j$）,那就删去第$i$行，第$j$列，剩下的就是（余因子）  
>3、这一行每个数都这样算$a_{ij} \times |C_{ij}| \times (-1)^{i+j}$，最后求和

>**定理 2**   
>若 $A$ 为三角阵，则 det$A$ 等于 $A$ 的主对角线上元素的乘积

### 3.2  行列式的性质
>**定理3 (行变换)**    
>令 $A$ 是一个方阵.  
>a. 若 $A$  的某一行的倍数加到另一行得矩阵B ， 则det $B$ = det $A$ .  
>b 若 $A$ 的两行互换得矩阵 $B$ ， 则 det $B$ = - det $A$.  
>c. 若 $A$ 的某行来以 $k$ 倍得到矩阵 $B$  ， 则det $B$ = $k$ det $A$ .    
>** 补充  
>$$\vert A^T\vert=\vert A\vert$$
>$$\vert A^{-1}\vert=\frac{1}{\vert A\vert}$$
>
>$$|A^{*}|=|A|^{n - 1}$$
>$$\vert kA\vert=k^{n}\vert A\vert$$

>**定理4**  
> 方阵 $A$ 是可逆的当且仅当 det $A \neq 0$

>**定理5**  
> 若 $A$ 为一个 $n \times n$ 矩阵，则det $A^T$ = det $A$.

>**定理6 (乘法的性质)**  
若 $A$ 和 $B$ 均为 $n \times n$ 矩阵，则 det $AB$ = (det $A$)( det $B$) .

* 行列式与秩的关系  
>$\text{det}(A)\neq0$那么矩阵$A$是满秩的，秩$\text{rank}(A) = n$。这是因为行列式不为零意味着矩阵的列（行）向量组是线性无关的  
>也就是齐次线性方程组$Ax=0$的充要条件是系数矩阵秩$\text{rank}(A) = n$

* **$r(A) = n$**  $\Leftrightarrow$  **$|A| \neq 0$**  $\Leftrightarrow$  **齐次线性方程组 $Ax = 0$ 只有零解 $\Leftrightarrow$ 可逆**

### 3.3 克拉默法则
>**定理7 (克拉默法则)**  
设 $A$ 是一个可逆的 $n \times n$ 矩阵，对 $R$<sup>m</sup> 中任意向量 $b$ ， 方程 $Ax =b$ 的唯一解可由下式给出:  
$$\displaystyle x_i=\frac{det \ \ A_i(b)}{det \ \ A},i=1,2,\cdots,,n$$

~~不太能解释~~
## 第四章


### 4.1 向量空间(vector space)与子空间(subspace)
>向量空间和向量计算法则一样

* 子空间
  >定义向量空间 $V$ 的一个子空间是 $V$ 的一个满足以下三个性质的子集 $H$:  
  a. $V$ 中的零向量在 $H$ 中  
  b. $H$ 对向量加法封闭，即对 $H$ 中任意向量 $U$，$V$ ， 和 $u + v$ 仍在 $H$ 中.  
  c. $H$ 对标量乘法封闭， 即对 $H$ 中任意向量 $u$ 和任意标量 $C$ ，向量 $cu$ 仍在 $H$ 中.


>**定理1** 若 $v_1,v_2,\cdots,v_p$ 在向量空间 $V$ 中，则$span\{x_1,x_2,\cdots,x_i\}$是 $V$ 的一个子空间.

### 4.2 零空间、列空间和线性变换
* 矩阵的零空间(null space)
  
  >**定义**  
  矩阵 $A$ 的零空间写成 $NulA$ ， 是齐次方程 $Ax = 0$ 的全体解的集合.

>**定理2** $m \times n$ 矩阵 $A$ 的零空间是$R$<sup>m</sup>的一个子空间.等价地, $m$ 个方程、$n$ 个未知数的齐次线性方程组 $Ax = 0$ 的全体解的集合是$R$<sup>m</sup>的一个子空间

* 矩阵的列空间(column space)
  >**定义**  
  $m \times n$矩阵 $A$ 的列空间(记为 $ColA$ ) 是由 $A$ 的列的所有线性组合组成的集合.若 $A=\begin{bmatrix}
  \ x_1\ x_2\ \cdots \  x_3 \ \\
  \end{bmatrix}$，则 $ColA = span\{x_1,x_2,\cdots,x_i\}$.

>**定理3** $m \times n$ 矩阵 $A$ 的列空间是 $R$<sup>m</sup> 的一个子空间.

* 线性变换的核与值域
  >线性变换 见1.8
  * 核(零空间 $Nul A$)
  >线性变换 $T$ 的核(或零空间)是 $V$ 中所有满足 $T(u) = 0$ 的向量 $u$ 的集合

### 4.3 线性无关集(linearly independent set)和基(basis)
* 线性无关 见1.7
  
>**定理5 (生成集定理)**  
令$S = \{v_1,v_2,\cdots,v_p\}$是$V$中的向量集，$H = span\{v_1,v_2,\cdots,v_p\}$.  
a.若 $S$ 中某一个向量(比如说 $v_k$ ) 是 $S$ 中其余向量的线性组合，则 $S$ 中去掉$v_k$ 后形成的集合仍然可以生成 $H$.  
b. 若$H \neq \{0\}$ ，则 $S$ 的某一子集是 $H$ 的一个基.

* NulA 和ColA 的基
  >**定理6**  
  矩阵 $A$ 的主元列构成 $ColA$ 的一个基.


### 4.5 向量空间的维数(dimension)
>**定理9**  
若向量空间 $V$ 具有一组基(n个基向量)， 则 $V$ 中任意包含多于 $n$ 个向量的集合一
定线性相关.

~~这是期中考证明题，没做出来~~

>**定理10** 若向量空间 $V$ 有一组基含有 $n$ 个向量，则 $V$ 的每一组基一定恰好含有 $n$ 个向量.

* $NulA$ 的维数是方程 $Ax=0$ 中自由变量的个数，$ColA$ 的维数是 $A$ 中主元列的个数.

### 4.6 秩(rank)

* $ColA^T = Row A$.
>**定理13** 若两个矩阵 $A$ 和 $B$ 行等价，则它们的行空间相同.若 $B$ 是阶梯形矩阵，则 $B$ 的非零行构成 $A$ 的行空间的一个基同时也是 $B$ 的行空间的一个基

~~?看不太懂~~

*以下比较重要*

>**定义**  
$A$ 的秩即 $A$ 的列空间的维数

>**定理14 (秩定理)**
$m \times n$ 矩阵 $A$ 的列空间和行空间的维数相等，这个公共的维数(即 $A$ 的秩)还等于 $A$ 的主元位置的个数且,满足方程
$$rank\  A+dim\ \ Nul \ A = n$$

>**定理 (可逆矩阵定理(续))**  
令 $A$ 是一个 $n \times n$ 矩阵，则下列命题中的每一个均等价于 $A$ 是可逆矩阵:  
a. $A$ 的列构成$R$<sup>n</sup>的一个基.  
b. $ColA=$$R$<sup>n</sup>.  
c. $dim \ ColA = n$.  
d. $rank A = n$.  
e. $Nul A = \{0\}$.  
f. $dim \ NulA=0$.  


### 4.7 基的变换
~~先欠着~~

## 第五章


### 5.1 特征向量(eigenvector)与特征值(eigenvalue)
  >定义 $A$ 为 $n \times n$ 矩阵，$x$ 为非零向量， 若存在数 $λ$ 使 $Ax=λx$ 有非平凡解 $x$， 则称 $λ$ 为 $A$的特征值,$x$ 称为对应于 $λ$ 的特征向量  
也可写作$(A-λI)x=0$

>**定理1**  
三角矩阵的主对角线的元素是其特征值.

>**定理2**  
$λ_1,\cdots,λ_r$ 是 $n \times n$ 矩阵 $A$ 相异的特征值，$v_1,\cdots,v_r$是与$λ_1,\cdots,λ_r$对应的特征向量，那么向量集合{$v_1,\cdots,v_r$}线性无关.



* 一、逆矩阵的特征值  
若矩阵$A$可逆，$\lambda$是$A$的特征值，则$A^{-1}$的特征值是$\displaystyle \frac{1}{\lambda}$，特征向量不变。

* 二、转置矩阵的特征值  
矩阵$A$与其转置矩阵$A^T$具有相同的特征值。

* 三、伴随矩阵的特征值  
若$A$可逆，$A$的特征值为$\lambda_i$（$i = 1,2,\cdots,n$，$\lambda_i\neq0$），则伴随矩阵$A^*$的特征值为$\displaystyle \frac{\vert A\vert}{\lambda_i}$，特征向量不变。

### 5.2 特征方程(eigen equation)
>**定理(可逆矩阵定理(续))**  
设 $A$ 是 $n \times n$ 矩阵，则 $A$ 是可逆的当且仅当  
a.0不是 $A$ 的特征值.  
b.$A$ 的行列式不等于零.



>**定理3 (行列式的性质)**  
设 $A$ 和 $B$ 是 $n \times n$ 矩阵.  
a. $A$ 可逆的元要条件是 det$A \neq 0$.  
b. det $AB =$ (det $A$)  (det$B$).  
c. det $A^T$ = det $A$.  
d. 若 $A$ 是三角形矩阵，那么det $A$ 是 $A$ 主对角线元素的乘积.  
e. 对 $A$ 作行替换不改变其行列式值.作一次行交换，行列式值符号改变一次数来一行后，
行列式值等于用此数来原来的行列式值.

>**定理4**  
若 $n \times n$ 矩阵 $A$ 和 $B$ 是相似的，那么它们有相同的特征多项式，从而有相同的特征值(和相同的重数).

### 5.3 对角化(diagonalize)
>**定理5 (对角化定理)**  
$n \times n$ 矩阵 $A$ 可对角化的充分必要条件是 $A$ 有 $n$ 个线性无关的特征向量.  
事实上， $A=PDP^{-1}$ , $D$ 为对角矩阵的充分必要条件是 $P$ 的列向量是 $A$ 的 $n$ 个线性无关的特征向量.此时，$D$ 的主对角线上的元素分别是 $A$ 的对应于 $P$ 中特征向量的特征值.

>**定理6**  
有 $n$ 个相异特征值的$n \times n$ 矩阵可对角化.

>**定理7**  
~~似乎不重要，因为我也读不懂~~

>**定理8 (对角矩阵表示)**  
设 $A=PDP^{-1}$ ， 其中 $D$ 为 $n \times n$ 对角矩阵，若  $R$<sup>n</sup> 的基$\beta$由 $P$ 的列向量组成，那么 $D$ 是变换 $x$ → $Ax$的$\beta$-矩阵.

## 第六章

### 6.1 内积、长度和正交性

* 内积  
  内积的英文是 “inner product” 或 “dot product”
> **定理1**  
> 设 $v$，$u$ 和 $w$ 是 $R$<sup>n</sup> 中的向量, $c$ 是一个数,那么  


$a. \ \ \ u \cdot v = v \cdot u$

$b.\ \ \ (u +v) \cdot w = u \cdot w +v \cdot w$

$c. \ \ \ (cu) \cdot v=c(u \cdot v)=u \cdot (cv)$

$d. \ \ \ u \cdot u \geq 0，并且u \cdot u=0 成立的充分必要条件是u=0$


* 向量的长度  

  $$||v|| ^2 = v \cdot v$$

$$dist(u,v)=||u-v||$$
 
* 正交向量  
  正交向量的英文是 “orthogonal vectors” 或 “perpendicular vectors”
  
>定义如果 $u \cdot v  = 0$ ，如 $R$<sup>n</sup> 中的两个向量 $u$ 和 $v$ 是(相互) 正交的.  

>对于一个方阵$A$，Col$A$中的向量与Nul$A$中的向量正交。

>**定理2 (毕达哥拉斯(勾股)定理)**

$$||u+v||^2=||u||^2+||v||^2$$

* 正交补  
  正交补的英文是 “orthogonal complement”
 
>1.向量 $x$ 属于 $W$<sup>⊥</sup> 的充分必要条件是向量 $x$ 与生成空间 $W$ 的任一向量都正交.  
>2. $W$<sup>⊥</sup> 止是 $R$<sup>n</sup> 的一个子空间.

>**定理3**  
$( Row A )$<sup>⊥</sup> = $Nul A$ 且  $( ColA )$<sup>⊥</sup> = $Nul A$<sup>T</sup>

### 6.2 正交集
 * 正交集的英文是 “orthogonal set” 或 “orthonormal set”
>**定理4**  
如果 $S=\{x_1,x_2,\cdots,x_i\}$ 是由 $R$<sup>n</sup> 中非零向量构成的正交集，那么 $S$ 是线性无关集，因此构成 $S$ 所生成的子空间的一组基.

>**定理5**  
假设$\{x_1,x_2,\cdots,x_i\}$是 $R$<sup>n</sup> 中于空间 $W$ 的正文基,对 $W$ 中的每个向量y,线性组合 $y=x_1c_1+\cdots+x_ic_i$ 中的权可以由 $c_j=(y \cdot u_j)/(u_j \cdot u_j)$计算

#### 正交投影  **先欠着**  ~~懒得写~~


>**定理6**  
一个 $m \times n$ 矩阵 U 具有单位正交列向量的充分必要条件是 $U$<sup>T</sup> $U$ = $I$.

>**定理7**  
假设 $U$ 是一个具有单位正交列的 $m \times n$ 矩阵，且 $x$ 和 $y$ 是 $R$<sup>n</sup> 中的向量，那么  
a. $||Ux|| = ||x|| .$  
b. $(Ux) \cdot (Uy) =x \cdot y$  
c. $(Ux) \cdot (Uy) = 0$ 的充分必要条件是 $x \cdot y = 0$

>**定理9 (最佳逼近定理)**  
假设 $W$ 是 $R$<sup>n</sup> 的一个子空间，$y$ 是 $R$<sup>n</sup> 中的任意向量， $\widehat{y}$ 是 $y$ 在 $W$ 上的正支投影，那么 $\widehat{y}$ 是 $W$ 中最接近 $y$ 的点，也就是  
$$||y-\widehat{y}||<||y-v||$$
>对所有属于 $W$ 又异于 $\widehat{y}$ 的 $v$ 成立.

### 6.4 格拉姆-施密特方法

#### 格拉姆 - 施密特方法

设$\left\{\boldsymbol{v}_{1},\boldsymbol{v}_{2},\cdots,\boldsymbol{v}_{n}\right\}$是内积空间$V$中的一组线性无关向量。  
首先$\boldsymbol{u}_{1}=\boldsymbol{v}_{1}$；对于$k = 2,3,\cdots,n$，
$$\boldsymbol{u}_{k}=\boldsymbol{v}_{k}-\sum_{j = 1}^{k - 1}\frac{\left\langle\boldsymbol{v}_{k},\boldsymbol{u}_{j}\right\rangle}{\left\langle\boldsymbol{u}_{j},\boldsymbol{u}_{j}\right\rangle}\boldsymbol{u}_{j}$$
即从$\boldsymbol{v}_{k}$中减去它在已构造正交向量$\boldsymbol{u}_{1},\boldsymbol{u}_{2},\cdots,\boldsymbol{u}_{k - 1}$上的投影，得到新正交向量$\boldsymbol{u}_{k}$。


### 6.5 最小二乘问题
* 最小二乘的英文是 “least squares” 或 “least square method”；  
最小二乘解的英文是 “least squares solution”。

* **定义**
  $$||b-A\widehat{x}||\leq||b-Ax||$$

>**定理13**  
方程 $Ax=b$ 的最小二乘解集和法方程 $A$<sup>T</sup> $Ax = A$<sup>T</sup> $b$ 的非空解集一致.

>**定理14**  
设 $A$ 是 $m \times n$ 矩阵. 下面的条件是逻辑等价的:  
a.对于 $R$<sup>n</sup> 中的每个 $b$ ， 方程 $Ax =b$ 有唯一最小二乘解.  
b.$A$ 的列是线性无关的.  
c.矩阵 $A$<sup>T</sup> $A$是可逆的.  
当这些条件成立时，最小二乘解￡有下面的表示:
$$\widehat{x}=( A^T A)^{-1}A^Tb$$


### 6.7 内积空间

>**定义**  
向量空间 $V$ 上的内积是一个函数，对每一对属于$V$的向量 $u$ 和 $v$，存在一个实数$\langle u,v \rangle$满足下面公理，其中 $u$，$v$，$w$ 属于$V$，$C$ 为所有数.   
1.$\langle u,v\rangle= \langle v,u \rangle$  
2.$\langle u +v, w\rangle =\langle u, w\rangle +\langle v,w\rangle$  
3.$\langle$c$u,v\rangle=$c$\langle u, v\rangle$  
4.$\langle u,u\rangle \geq 0$且$\langle u,u\rangle =0$ 的充分必要条件是  $u=0$  
一个赋予上面内积的向量空间称为**内积空间**

* 内积空间的英文是 “inner product space” 或 “pre-Hilbert space”


>**定理16 (柯西-施瓦茨不等式)**  
对 $V$ 中任意向量 $u$ 和 $v$，有
$$|\langle u,v \rangle| \leq ||u||\ \  ||v||$$


>**定理17 (三角不等式)**  
对属于$V$ 的所有向量$u$,$v$，有
$$||u-v||\leq||u||+||v||$$






## 第七章

### 7.1 对称矩阵的对角化

就是$A^T=A$

>**定理1** 如果 $A$ 是对称矩阵，那么不同特征空间的任意两个特征向量是正交的.

>**定理2** 一个$n \times  n$ 矩阵 $A$ 可正交对角化的充分必要条件是 $A$ 是对称矩阵.

### 7.2 二次型
* 二次型是一个定义在 $R$<sup>n</sup> 上的函数， 它在向量 $x$ 处的值可由表达式$Q(x) = x^T Ax$ 计算，其中 $A$ 是一个 $n \times n$ 对称矩阵.矩阵 $A$ 称为关于二次型的矩阵.
### 7.4 SVD
SVD是奇异值分解（Singular Value Decomposition）的英文缩写。它是一种重要的矩阵分解方法。对于任意一个实矩阵$A_{m\times n}$（$m$行$n$列），都可以分解为
$$A = U\Sigma V^{T}$$
的形式。其中$U$是$m\times m$的正交矩阵，$V$是$n\times n$的正交矩阵，$\Sigma$是$m\times n$的对角矩阵，其对角线上的元素$\sigma_{ii}$（$i = 1,2,\cdots,\min(m,n)$）称为奇异值，并且$\sigma_{ii}\geq0$，这些奇异值按照从大到小的顺序排列在$\Sigma$的对角线上。
   

